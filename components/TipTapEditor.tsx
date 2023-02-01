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
// load all highlight.js languages
import { lowlight } from "lowlight";
import CodeBlock from "./CodeBlock";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

const Menubar = ({
  addImage,
  addCodeStyle,
}: {
  addImage: () => void;
  addCodeStyle: () => void;
}) => {
  return (
    <>
      <PhotoIcon sx={{ cursor: "pointer" }} onClick={addImage} />
      <CodeIcon onClick={addCodeStyle} />
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
      Image,
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

  const addImage = () => {
    const url = window.prompt("URL");

    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <>
      <Menubar addImage={addImage} addCodeStyle={addCodeStyle} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
