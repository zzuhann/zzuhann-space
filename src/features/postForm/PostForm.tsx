import DraftEditor from '@/components/DraftEditor/DraftEditor';
import { Box, Typography } from '@mui/material';
import { EditorState, convertToRaw } from 'draft-js';
import { useEffect, useRef, useState } from 'react';
import { Title } from './component/Title';
import { Tags } from './component/Tags';
import { getDataById, updateFirestoreById, uploadFirestore, uploadStorageImage } from '@/common/firebaseFun';
import { Count } from '@/common/articleType';
import draftToHtml from 'draftjs-to-html';
import { Button } from '@/components/common/Common';

const PostForm = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [newOption, setNewOption] = useState<string>('');
  const [tagArticlesCount, setTagArticlesCount] = useState<Count>();
  const [contentEditorState, setContentEditorState] = useState(EditorState.createEmpty());
  const [content, setContent] = useState<string>('');
  const [descriptionEditorState, setDescriptionEditorState] = useState(EditorState.createEmpty());
  const [description, setDescription] = useState<string>('');
  const [uploadImages, setUploadImages] = useState<
    {
      file: File;
      localSrc: string;
    }[]
  >([]);

  const onContentEditorStateChange = (newEditorState: EditorState) => {
    setContentEditorState(newEditorState);
    setContent(draftToHtml(convertToRaw(newEditorState.getCurrentContent())));
  };

  const onDescriptionEditorStateChange = (newEditorState: EditorState) => {
    setDescriptionEditorState(newEditorState);
    setDescription(draftToHtml(convertToRaw(newEditorState.getCurrentContent())));
  };

  const _uploadImageCallBack = async (file: File) => {
    const uploadedImages = uploadImages;
    const image = file;
    const url = await uploadStorageImage(image.name, image);

    const imageObject = {
      file: file,
      localSrc: url,
    };
    uploadedImages.push(imageObject);
    setUploadImages(uploadImages);

    return new Promise((resolve, reject) => {
      resolve({ data: { link: imageObject.localSrc } });
    });
  };

  const updateTagCount = (tag: string) => {
    if (!tagArticlesCount) return;

    if (tagArticlesCount[tag] === undefined) {
      tagArticlesCount[tag] = 1;
    } else {
      tagArticlesCount[tag] += 1;
    }

    updateFirestoreById({
      target: 'allTags',
      id: 'tagArticlesCount',
      data: { count: tagArticlesCount },
    });
  };

  const onSubmit = () => {
    if (!titleRef.current) return;

    const title = titleRef.current.value;

    if (!title || !content || !description) return;
    const articleInfo = {
      target: 'articles',
      data: {
        title,
        content: content,
        createTime: new Date(),
        updateTime: new Date(),
        author: 'zzuhann',
        tag: newOption,
        description: description,
      },
    };
    updateTagCount(newOption);
    uploadFirestore(articleInfo);
    updateFirestoreById({
      target: 'allTags',
      id: 'tags',
      data: { tags: tags },
    });
    clear();
  };

  const clear = () => {
    if (titleRef.current) {
      titleRef.current.value = '';
    }
    setNewOption('');
    setDescriptionEditorState(EditorState.createEmpty());
    setDescription('');
    setContentEditorState(EditorState.createEmpty());
    setContent('');
  };

  useEffect(() => {
    const getTagArticlesCount = async () => {
      const response = await getDataById<{ count: Count }>('allTags', 'tagArticlesCount');
      if (response) {
        setTagArticlesCount(response?.count);
      }
    };
    const getTags = async () => {
      const response = await getDataById<{ tags: { tags: string[] } }>('allTags', 'tags');
      if (response) {
        setTags((response.tags.tags as string[]) ?? []);
      }
    };
    getTagArticlesCount();
    getTags();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Typography sx={{ fontSize: '32px', fontWeight: 'bold' }}>新增文章</Typography>
      <Title titleRef={titleRef} />
      <Tags tags={tags} setTags={setTags} newOption={newOption} setNewOption={setNewOption} />
      <DraftEditor
        type="description"
        editorState={descriptionEditorState}
        onEditorStateChange={onDescriptionEditorStateChange}
        _uploadImageCallBack={_uploadImageCallBack}
      />
      <DraftEditor
        type="content"
        editorState={contentEditorState}
        onEditorStateChange={onContentEditorStateChange}
        _uploadImageCallBack={_uploadImageCallBack}
      />
      <Button onClick={onSubmit} style={{ alignSelf: 'flex-start' }}>
        送出
      </Button>
    </Box>
  );
};

export default PostForm;
