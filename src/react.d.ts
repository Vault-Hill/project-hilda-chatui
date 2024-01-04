
import '@google/model-viewer';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': MyElementAttributes;
    }
    interface MyElementAttributes {
      src: string;
      class?: string,
      alt?: string,
      'camera-controls'?: boolean
      'touch-action'?: string
      ar?: boolean,
    }
  }
}