import { Box, Heading } from '@chakra-ui/core';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { EditDeletePostButton } from '../../components/EditDeletePostButton';
import { Layout } from '../../components/Layout';
import { usePostQuery } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';

const Post = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;
  const [{ data, error, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  if (fetching) {
    return (
      <Layout>
        <div>...loading</div>
      </Layout>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  if (!data?.post) {
    return (
      <Layout>
        <Box>could find post</Box>
      </Layout>
    );
  }
  return (
    <Layout>
      <Heading mb={4}>{data?.post?.title}</Heading>
      <Box mb={4}>{data?.post?.text}</Box>
      <EditDeletePostButton
        id={data.post.id}
        creatorId={data.post.creator.id}
      />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
