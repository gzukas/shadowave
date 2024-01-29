import { useRef } from 'react';
import { useAtom } from 'jotai';
import { Trash } from 'lucide-react';
import { Trans, Plural } from '@lingui/macro';
import { cn } from '@/lib/utils';
import { imagesAtom } from '@/atoms/imagesAtom';
import { Button } from '@/components/ui/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/Tooltip';
import { ReverseImages } from './ReverseImages';

export interface ChooseImagesProps
  extends React.ComponentPropsWithoutRef<'div'> {
  inputProps?: Omit<
    Partial<React.ComponentPropsWithoutRef<'input'>>,
    'type' | 'onChange' | 'className'
  >;
}

export function ChooseImages(props: ChooseImagesProps) {
  const { className, inputProps, ...other } = props;
  const [images, setImages] = useAtom(imagesAtom);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setImages(e.target.files ?? []);
  };

  const handleRemoveClick = () => {
    setImages([]);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div
      className={cn(
        'flex',
        'items-center',
        'space-x-1',
        'rounded-md',
        'bg-secondary',
        className
      )}
      {...other}
    >
      <ReverseImages />
      <Button variant="secondary" asChild>
        <label role="button" className="grow">
          {images.length ? (
            <Plural value={images.length} one="# image" other="# images" />
          ) : (
            <Trans>Choose Images</Trans>
          )}
          <input
            ref={inputRef}
            type="file"
            onChange={handleChange}
            className="hidden"
            accept="image/*"
            multiple
            {...inputProps}
          />
        </label>
      </Button>
      {images.length ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary" size="icon" onClick={handleRemoveClick}>
              <Trash className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <Trans>Remove images</Trans>
          </TooltipContent>
        </Tooltip>
      ) : null}
    </div>
  );
}
