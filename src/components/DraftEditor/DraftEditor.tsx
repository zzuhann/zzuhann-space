import '/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { useState } from 'react';

import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), { ssr: false });
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Box, Typography } from '@mui/material';

type Props = {
  editorState: EditorState;
  onEditorStateChange: (editorState: EditorState) => void;
  _uploadImageCallBack: (file: File) => Promise<unknown>;
  type: 'content' | 'description';
};

const DraftEditor = ({ editorState, onEditorStateChange, _uploadImageCallBack, type }: Props) => {
  return (
    <>
      {type === 'content' ? <Typography>內文</Typography> : <Typography>簡介</Typography>}
      <Box sx={{ border: 'solid 1px #ececec', minHeight: '600px', maxHeight: '600px', borderRadius: '8px' }}>
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'textAlign', 'colorPicker', 'image', 'link', 'history'],
            inline: {
              options: ['italic', 'bold', 'strikethrough'],
              bold: { className: 'demo-option-custom' },
              italic: { className: 'demo-option-custom' },
              underline: { className: 'demo-option-custom' },
              strikethrough: { className: 'demo-option-custom' },
              monospace: { className: 'demo-option-custom' },
              superscript: { className: 'demo-option-custom' },
              subscript: { className: 'demo-option-custom' },
            },
            blockType: { className: 'demo-option-custom-wide', dropdownClassName: 'demo-dropdown-custom' },
            fontSize: { className: 'demo-option-custom-medium' },
            link: { className: 'demo-option-custom' },
            image: {
              className: 'demo-option-custom-medium',
              urlEnabled: true,
              uploadEnabled: true,

              alignmentEnabled: true,
              previewImage: true,
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
              alt: { present: false, mandatory: false },
              defaultSize: {
                height: 'auto',
                width: 'auto',
              },
              uploadCallback: _uploadImageCallBack,
            },
          }}
        />
      </Box>
    </>
  );
};

export default DraftEditor;
