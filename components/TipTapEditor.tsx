import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Blockquote from "@tiptap/extension-blockquote";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import PhotoIcon from "@mui/icons-material/Photo";
import CodeIcon from "@mui/icons-material/Code";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { lowlight } from "lowlight";
import CodeBlock from "./CodeBlock";
import { ChangeEvent } from "react";
import { uploadStorageImage } from "../common/firebaseFun";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

const Menubar = ({
  addImage,
  addCodeStyle,
}: {
  addImage: (e: ChangeEvent<HTMLInputElement>) => void;
  addCodeStyle: () => void;
}) => {
  return (
    <>
      <ImageLabel addImage={addImage} />
      <CodeIcon onClick={addCodeStyle} />
    </>
  );
};

const ImageLabel = ({
  addImage,
}: {
  addImage: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <label htmlFor="image">
        <PhotoIcon sx={{ cursor: "pointer" }} />
      </label>
      <input
        type="file"
        accept="image/*"
        id="image"
        name="image"
        style={{ display: "none" }}
        onChange={(e) => addImage(e)}
      />
    </>
  );
};

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      HorizontalRule,
      Blockquote,
      Image.configure({
        HTMLAttributes: {
          class: "article-img",
        },
      }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlock);
        },
      }).configure({ lowlight }),
    ],
    content: "<p>Hello World! 🌎️</p>",
  });

  const addCodeStyle = () => {
    if (editor) {
      editor.chain().focus().toggleCodeBlock().run();
    }
  };

  const attachImageAfterEditor = (url: string) => {
    if (!editor) return;
    editor.chain().focus().setImage({ src: url }).run();
  };

  const addImage = (e: ChangeEvent<HTMLInputElement>) => {
    const allFiles = e.target.files;
    if (allFiles && editor) {
      const image = allFiles[0];
      uploadStorageImage(image.name, image, attachImageAfterEditor);
    }

    // if (url && editor) {
    //   editor.chain().focus().setImage({ src: url }).run();
    // }
  };

  return (
    <>
      <Menubar addImage={addImage} addCodeStyle={addCodeStyle} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
