declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_BASE_URL: string;
    }
  }

  declare module "*.svg" {
    import {FunctionComponent, SVGProps} from "react";

    export const ReactComponent: FunctionComponent<SVGProps<
      SVGSVGElement
    > & { style?: Object, className?: string }>;

    const src: string;
    export default src;
  }

  declare module "*.png" {
    const content: any;
    export default content;
  }
}
