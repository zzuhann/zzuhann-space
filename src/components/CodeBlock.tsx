import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

interface CodeBlockType {
  node: {
    attrs: {
      language: string | number | readonly string[];
    };
  };
  updateAttributes: any;
  extension: any;
}

const CodeBlock = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}: CodeBlockType) => {
  return (
    <NodeViewWrapper className="code-block">
      <select
        contentEditable={false}
        defaultValue={defaultLanguage}
        onChange={(event) => updateAttributes({ language: event.target.value })}
      >
        <option value="null">auto</option>
        <option disabled>—</option>
        {extension.options.lowlight
          .listLanguages()
          .map((lang: any, index: number) => (
            <option key={index} value={lang}>
              {lang}
            </option>
          ))}
      </select>
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};
export default CodeBlock;
