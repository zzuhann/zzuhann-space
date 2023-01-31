import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Blockquote from "@tiptap/extension-blockquote";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography, HorizontalRule, Blockquote],
    content: "<p>Hello World! 🌎️</p>",
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
