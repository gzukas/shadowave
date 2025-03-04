import React from 'react';
import { CoreFileOptions, fileOpen, FileWithHandle } from 'browser-fs-access';
import { composeEventHandlers } from '@radix-ui/primitive';
import { Button } from '@workspace/ui/components/button';

export interface ChooseFilesProps extends React.ComponentProps<typeof Button> {
  /**
   * The callback that receives the array of selected files. Not called if the file
   * picker is cancelled.
   *
   * @param files - An array of the selected files.
   */
  onFilesChange: (files: FileWithHandle[]) => void;

  /**
   * Configuration options for the file picker dialog.
   */
  options?: CoreFileOptions;
}

export function ChooseFiles(props: ChooseFilesProps) {
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
      onClick={composeEventHandlers(props.onClick, handleClick)}
    />
  );
}
