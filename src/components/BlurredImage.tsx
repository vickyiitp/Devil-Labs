import Image, { ImageProps } from './Image';

export interface BlurredImageProps extends ImageProps {}

export default function BlurredImage(props: BlurredImageProps) {
  return <Image {...props} />;
}

