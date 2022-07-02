import * as React from 'react';
import {
  Paragraph1,
  ParagraphMedium,
  ParagraphSmall,
  ParagraphXSmall,
} from 'baseui/typography';
import {Block} from 'baseui/block';
import {Button, KIND} from 'baseui/button';
import Image from 'next/image';

export default function ProjectCard({coverImg} : {coverImg: string}) {
  return (
    <div
      onClick={() => {
        console.log('popup to active');
      }}
      style = {{width: '100%', height: '100%', position: 'relative' }}
    >
      hi
      {/* <Image
        src={coverImg}
        height={'250px'}
        width={'100%'}
        layout={'fill'}
        objectFit={'contain'}
      /> */}
    </div>
  );
}
