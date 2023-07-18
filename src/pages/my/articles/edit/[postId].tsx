import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Count, IArticle } from '@/common/articleType';
import { getDataById, updateFirestoreById, uploadStorageImage } from '@/common/firebaseFun';
import { Button, Title32px } from '@/components/common/Common';
import { Stack } from '@mui/material';
import { getLayout } from '@/layout';
import { Title } from '@/features/postForm/component/Title';
import { Tags } from '@/features/postForm/component/Tags';
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js';
import DraftEditor from '@/components/DraftEditor/DraftEditor';
import draftToHtml from 'draftjs-to-html';

const EditArticle = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [articleDetail, setArticleDetail] = useState<IArticle>();
  const [tags, setTags] = useState<string[]>([]);
  const [newOption, setNewOption] = useState<string>('');
  const [context, setContext] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const titleRef = useRef<HTMLInputElement>(null);
  const [tagArticlesCount, setTagArticlesCount] = useState<Count>();
  const [contentEditorState, setContentEditorState] = useState(EditorState.createEmpty());
  const [descriptionEditorState, setDescriptionEditorState] = useState(EditorState.createEmpty());
  const [uploadImages, setUploadImages] = useState<
    {
      file: File;
      localSrc: string;
    }[]
  >([]);

  const updateTagCount = (tag: string) => {
    if (!tagArticlesCount) return;
    if (!articleDetail) return;

    if (articleDetail.tag === tag) return;

    const newCount = { ...tagArticlesCount };

    if (tagArticlesCount[tag] === undefined) {
      newCount[tag] = 1;
    } else {
      newCount[tag] += 1;
    }
    newCount[articleDetail.tag] -= 1;
    if (newCount[articleDetail.tag] === 0) {
      delete newCount[articleDetail.tag];
    }

    updateFirestoreById({
      target: 'allTags',
      id: 'tagArticlesCount',
      data: { count: newCount },
    });
  };

  const onSubmit = () => {
    const newTitle = titleRef.current?.value;
    const target = 'articles';
    const id = postId;
    if (!newTitle) return;
    if (!articleDetail) return;
    const newArticle: IArticle = {
      ...articleDetail,
      content: context,
      title: newTitle,
      updateTime: new Date(),
      tag: newOption,
    };
    updateTagCount(newOption);
    updateFirestoreById({ target, id: id as string, data: newArticle });
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
    setContext('');
  };

  const onContentEditorStateChange = (newEditorState: EditorState) => {
    setContentEditorState(newEditorState);
    setContext(draftToHtml(convertToRaw(newEditorState.getCurrentContent())));
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

  useEffect(() => {
    const getArticleInfo = () => {
      const collection = 'articles';
      const response = getDataById(collection, postId as string);
      response.then((res) => {
        const articleInfo = res as IArticle;
        const contentBlock = convertFromHTML(articleInfo.content);
        const initialContentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const descriptionBlock = convertFromHTML(articleInfo.description);
        const initialDescriptionState = ContentState.createFromBlockArray(descriptionBlock.contentBlocks);
        setArticleDetail(articleInfo);
        setNewOption(articleInfo.tag);
        setContext(articleInfo.content);
        setContentEditorState(EditorState.createWithContent(initialContentState));
        setDescription(articleInfo.description);
        setDescriptionEditorState(EditorState.createWithContent(initialDescriptionState));
      });
    };
    if (postId) {
      getArticleInfo();
    }
  }, [postId]);

  useEffect(() => {
    if (titleRef.current && articleDetail) {
      titleRef.current.value = articleDetail.title;
    }
  }, [articleDetail]);

  useEffect(() => {
    const getTagArticlesCount = async () => {
      const response = await getDataById<{ count: Count }>('allTags', 'tagArticlesCount');
      if (response) {
        setTagArticlesCount(response?.count);
      }
    };
    const getTags = async () => {
      const response = await getDataById('allTags', 'tags');
      setTags((response as string[]) ?? []);
    };
    getTagArticlesCount();
    getTags();
  }, []);

  return (
    <Stack direction="column">
      <Title32px>編輯文章</Title32px>
      <Title titleRef={titleRef} />
      <Tags
        tags={tags}
        setTags={setTags}
        newOption={newOption}
        setNewOption={setNewOption}
        defaultTag={articleDetail?.tag}
      />
      {description && (
        <DraftEditor
          editorState={descriptionEditorState}
          onEditorStateChange={onDescriptionEditorStateChange}
          _uploadImageCallBack={_uploadImageCallBack}
          type="description"
        />
      )}
      {context && (
        <DraftEditor
          editorState={contentEditorState}
          onEditorStateChange={onContentEditorStateChange}
          _uploadImageCallBack={_uploadImageCallBack}
          type="content"
        />
      )}
      <Button onClick={onSubmit} style={{ alignSelf: 'flex-start' }}>
        送出
      </Button>
    </Stack>
  );
};

EditArticle.getLayout = getLayout;

export default EditArticle;
