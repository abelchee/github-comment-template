import classNames from "clsx";
import React from "react";

export type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "link"
  | "success"
  | "danger"
  | "warning"
  | "info";

export type ButtonFillStyle = "filled" | "outline";

const defaultClassName =
  "px-6 py-2.5 font-medium text-sm leading-tight rounded shadow-md focus:shadow-lg active:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out";

const primaryVariantClassName =
  "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  active:bg-blue-800";

const primaryOutlineClassName =
  "border-2 border-blue-600 text-blue-600 hover:bg-black hover:bg-opacity-5";

const defaultVariantClassName =
  "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 active:bg-gray-400";

const defaultOutlineClassName =
  "border-2 border-gray-700 text-gray-700 hover:bg-black hover:bg-opacity-5";

const secondaryVariantClassName =
  "bg-purple-600 text-white font-medium hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-800";

const secondaryOutlineClassName =
  "border-2 border-purple-600 text-purple-600 hover:bg-black hover:bg-opacity-5";

const linkVariantClassName =
  "bg-transparent text-blue-600 hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200 shadow-none";

const successVariantClassName =
  "bg-green-500 text-white hover:bg-green-600 focus:bg-green-600 active:bg-green-700";

const successOutlineClassName =
  "border-2 border-green-500 text-green-500 hover:bg-black hover:bg-opacity-5";

const dangerVariantClassName =
  "bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-800";

const dangerOutlineClassName =
  "border-2 border-red-600 text-red-600 hover:bg-black hover:bg-opacity-5";

const warningVariantClassName =
  "bg-yellow-500 text-white hover:bg-yellow-600 focus:bg-yellow-600 active:bg-yellow-700";

const warningOutlineClassName =
  "border-2 border-yellow-500 text-yellow-500 hover:bg-black hover:bg-opacity-5";

const infoVariantClassName =
  "bg-blue-400 text-white hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-600";

const infoOutlineClassName =
  "border-2 border-blue-400 text-blue-400 hover:bg-black hover:bg-opacity-5";

function getButtonClassName(
  variant: ButtonVariant,
  fillStyle: ButtonFillStyle
): string {
  if (fillStyle === "filled") {
    switch (variant) {
      case "info":
        return infoVariantClassName;
      case "danger":
        return dangerVariantClassName;
      case "default":
        return defaultVariantClassName;
      case "link":
        return linkVariantClassName;
      case "primary":
        return primaryVariantClassName;
      case "secondary":
        return secondaryVariantClassName;
      case "success":
        return successVariantClassName;
      case "warning":
        return warningVariantClassName;
    }
  } else {
    switch (variant) {
      case "info":
        return infoOutlineClassName;
      case "danger":
        return dangerOutlineClassName;
      case "default":
        return defaultOutlineClassName;
      case "link":
        return linkVariantClassName;
      case "primary":
        return primaryOutlineClassName;
      case "secondary":
        return secondaryOutlineClassName;
      case "success":
        return successOutlineClassName;
      case "warning":
        return warningOutlineClassName;
    }
  }
}

export const Button: React.FC<
  React.PropsWithChildren<{
    className?: string;
    type?: "button" | "submit";
    variant?: ButtonVariant;
    fillStyle?: ButtonFillStyle;
    rounded?: boolean;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    title?: string;
  }>
> = ({
  className,
  type = "button",
  variant = "default",
  fillStyle = "filled",
  rounded = false,
  disabled = false,
  children,
  onClick,
  title,
}) => {
  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      className={classNames(
        defaultClassName,
        getButtonClassName(variant, fillStyle),
        className,
        {
          "rounded-full px-2.5 py-2.5": rounded,
          "pointer-events-none opacity-60": disabled,
        }
      )}
    >
      {children}
    </button>
  );
};
