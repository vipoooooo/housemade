import { HeadingMedium } from 'baseui/typography';
import * as React from 'react';

export default function HeadingTitle({title} : {title: string}) {
    return (
        <HeadingMedium margin={'0 0 20px 0'}>
        {title}
      </HeadingMedium>
    )
};
