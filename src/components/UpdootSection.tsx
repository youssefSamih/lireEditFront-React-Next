import { Flex, IconButton } from '@chakra-ui/core';
import React, { useState } from 'react';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export function UpdootSection({ post }: UpdootSectionProps) {
  const [loadingState, setLoadingState] = useState<
    'updoot-loading' | 'downdoot-loading' | 'not-loading'
  >('not-loading');
  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        aria-label="updoot post"
        icon="chevron-up"
        isLoading={loadingState === 'updoot-loading'}
        variantColor={post.voteStatus === 1 ? 'green' : undefined}
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState('updoot-loading');
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState('not-loading');
        }}
      />
      {post.points}
      <IconButton
        aria-label="downdoot post"
        icon="chevron-down"
        isLoading={loadingState === 'downdoot-loading'}
        variantColor={post.voteStatus === -1 ? 'red' : undefined}
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState('downdoot-loading');
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState('not-loading');
        }}
      />
    </Flex>
  );
}
