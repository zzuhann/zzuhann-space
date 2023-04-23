import { useEditor, EditorContent, ReactNodeViewRenderer, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Blockquote from '@tiptap/extension-blockquote';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import PhotoIcon from '@mui/icons-material/Photo';
import CodeIcon from '@mui/icons-material/Code';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { lowlight } from 'lowlight';
import CodeBlock from '@/components/CodeBlock';
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { uploadStorageImage } from '@/common/firebaseFun';
import { InputTitle } from '@/features/addPosts/AddPosts.style';
import styled from 'styled-components';

lowlight.registerLanguage('html', html);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('js', js);
lowlight.registerLanguage('ts', ts);

const IconConainer = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  > * {
    cursor: pointer;
  }
`;

const TipTapContainer = styled.div`
  margin-bottom: 24px;
`;

const Menubar = ({
  addImage,
  addCodeStyle,
  setLink,
  unsetLink,
  editor,
}: {
  addImage: (e: ChangeEvent<HTMLInputElement>) => void;
  addCodeStyle: () => void;
  setLink: () => void;
  unsetLink: () => void;
  editor: Editor | null;
}) => {
  return (
    <IconConainer>
      <ImageLabel addImage={addImage} />
      <CodeIcon onClick={addCodeStyle} />
      <InsertLinkIcon onClick={setLink} className={editor?.isActive('link') ? 'is-active' : ''} />
      <button onClick={unsetLink} disabled={!editor?.isActive('link')}>
        <LinkOffIcon />
      </button>
    </IconConainer>
  );
};

const ImageLabel = ({ addImage }: { addImage: (e: ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <>
      <label htmlFor="image">
        <PhotoIcon sx={{ cursor: 'pointer' }} />
      </label>
      <input
        type="file"
        accept="image/*"
        id="image"
        name="image"
        style={{ display: 'none' }}
        onChange={(e) => addImage(e)}
      />
    </>
  );
};

export const Tiptap = ({
  context,
  setContext,
  type,
}: {
  context: string;
  setContext: Dispatch<SetStateAction<string>>;
  type: string;
}) => {
  const [editor, setEditor] = useState<Editor | null>(null);
  const editorRef = useRef<Editor | null>(null);

  const addCodeStyle = () => {
    if (editor) {
      editor.chain().focus().toggleCodeBlock().run();
    }
  };

  const attachImageAfterEditor = (url: string) => {
    if (!editorRef.current) return;
    editorRef.current.commands.setImage({ src: url });
  };

  const addImage = (e: ChangeEvent<HTMLInputElement>) => {
    const allFiles = e.target.files;
    if (allFiles && editor) {
      const image = allFiles[0];
      if (!!image.name) return;
      uploadStorageImage(image.name, image, attachImageAfterEditor);
    }
  };

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const unsetLink = () => {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
  };

  useEffect(() => {
    const editor = new Editor({
      extensions: [
        StarterKit,
        Highlight,
        Typography,
        HorizontalRule,
        Blockquote,
        Image.configure({
          HTMLAttributes: {
            class: 'article-img',
          },
        }),
        CodeBlockLowlight.extend({
          addNodeView() {
            return ReactNodeViewRenderer(CodeBlock);
          },
        }).configure({ lowlight }),
        Link.configure({
          openOnClick: false,
        }),
      ],
      content: `${context}`,
      onUpdate: ({ editor }) => {
        setContext(() => editor.getHTML());
      },
    });
    setEditor(editor);
    editorRef.current = editor;

    return () => {
      editor?.destroy();
    };
  }, []);

  return (
    <TipTapContainer>
      {type === 'description' ? <InputTitle>前言敘述</InputTitle> : <InputTitle>文章內容</InputTitle>}
      <Menubar
        addImage={addImage}
        addCodeStyle={addCodeStyle}
        editor={editor}
        setLink={setLink}
        unsetLink={unsetLink}
      />
      <EditorContent editor={editor} />
    </TipTapContainer>
  );
};
