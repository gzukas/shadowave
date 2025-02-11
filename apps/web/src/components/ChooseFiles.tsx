import React from 'react';
import { CoreFileOptions, fileOpen, FileWithHandle } from 'browser-fs-access';
import { composeEventHandlers } from '@radix-ui/primitive';
import { Button } from '@workspace/ui/components/button';

export interface ChooseFilesProps extends React.ComponentProps<typeof Button> {
  onFilesChange?: (files: FileWithHandle[]) => void;
  options?: CoreFileOptions;
}

export const ChooseFiles = React.forwardRef(function ChooseFiles(
  props: ChooseFilesProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { onFilesChange, options, ...other } = props;
  const handleClick = async () => {
    try {
      onFilesChange?.(
        await fileOpen({
          multiple: true,
          ...options
        })
      );
    } catch (error) {
      // Disregard errors if file opening is canceled.
      if (!(error instanceof DOMException)) {
        throw error;
      }
    }
  };

  return (
    <Button
      {...other}
      ref={ref}
      onClick={composeEventHandlers(props.onClick, handleClick)}
    />
  );
});
