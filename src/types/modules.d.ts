declare module "@reach/auto-id" {
  export default function autoId(): number;
}

declare module "@reach/dialog" {
  interface DialogOverlayProps {
    isOpen?: boolean;
    onDismiss: () => void;
    style: any;
    className?: string;
    children: React.ReactElement<any>;
  }

  export const DialogOverlay: React.SFC<DialogOverlayProps>;

  interface DialogContentProps {
    children: React.ReactElement<any>;
    className?: string;
    style: any;
  }

  export const DialogContent: React.SFC<DialogContentProps>;
}

declare module "@reach/alert" {
  export interface AlertProps {
    children?: React.ReactElement<any>;
    type?: "assertive" | "polite";
    className?: string;
  }

  const Alert: React.SFC<AlertProps>;
  export default Alert;
}

declare module "@reach/visually-hidden" {
  const VisuallyHidden: React.SFC<>;
  export default VisuallyHidden;
}

// declare module "toasted-notes" {
//   export type ToastPositions =
//     | "top-left"
//     | "top"
//     | "top-right"
//     | "bottom-left"
//     | "bottom"
//     | "bottom-right";

//   export interface ToastOptions {
//     position?: ToastPositions;
//     duration?: number;
//   }

//   declare class Toaster {
//     notify(message: string | React.ReactNode, options?: Options): void;
//   }

//   const Toast: Toaster;
//   export default Toast;
// }

declare module "@reach/menu-button" {
  interface IButtonRect {
    height: number;
    width: number;
    left: number;
    top: number;
  }

  interface IState {
    isOpen: boolean;
    closingWithClick: boolean;
    selectionIndex: number;
    buttonRect: undefined | IButtonRect;
    buttonId: string;
  }

  export interface IMenuProps {
    children: React.ReactNode;
  }

  export const Menu: React.SFC<IMenuProps>;

  export type MenuButtonProps = JSX.IntrinsicElements["button"] & {
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
    children: React.ReactNode;
  };

  export const MenuButton: React.SFC<MenuButtonProps>;

  export type MenuListProps = JSX.IntrinsicElements["div"] & {
    children: React.ReactNode;
  };

  export const MenuList: React.SFC<MenuListProps>;

  type ResolvedMenuLinkProps<T> = T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T]
    : T;

  type ResolvedMenuLinkComponent<T> = T extends keyof JSX.IntrinsicElements
    ? T
    : React.ComponentType<T>;

  export type MenuLinkProps<
    T extends SupportedMenuLinkComponent
  > = ResolvedMenuLinkProps<T> & {
    to?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    component?: ResolvedMenuLinkComponent<T>;
    index?: number;
    style?: React.CSSProperties;
    setState?: (s: IState) => Partial<IState>;
    state?: IState;
    _ref?: (node: HTMLElement) => void;
  };

  type SupportedMenuLinkComponent = object | keyof JSX.IntrinsicElements;

  export function MenuLink<T extends SupportedMenuLinkComponent>(
    props: MenuLinkProps<T>
  ): React.ReactElement<MenuLinkProps<T>>;

  export type MenuItemProps = JSX.IntrinsicElements["div"] & {
    onSelect: () => void;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
    onMouseMove?: (e: React.MouseEvent<HTMLElement>) => void;
    role?: string;
    state?: IState;
    setState?: (s: IState) => Partial<IState>;
    index?: number;
    _ref?: (node: HTMLElement) => void;
  };

  export const MenuItem: React.SFC<MenuItemProps>;
}

declare module "dom-helpers/util/inDOM" {
  return boolean;
}

declare module "element-in-view" {
  const elementInView: (
    element: Element,
    {
      offset,
      threshold
    }?: {
      offset?: number | undefined;
      threshold?: number | undefined;
    }
  ) => boolean;

  export default elementInView;
}

declare module "raf-schd" {
  const rafSchedule: (any) => any;
  export default rafSchedule;
}

declare module "@reach/skip-nav" {
  interface ISkipNavProps {
    children: string | JSX.Element;
  }
  class SkipNavLink extends React.Component<ISkipNavProps, {}> {}
  class SkipNavContent extends React.Component<ISkipNavProps, {}> {}
}
