declare module '*.svg?react' {
  import { FunctionComponent, SVGProps } from 'react';
  const react: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default react;
}
