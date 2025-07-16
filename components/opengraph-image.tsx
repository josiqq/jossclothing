import { readFile } from 'fs/promises';
import { ImageResponse } from 'next/og';
import { join } from 'path';
import LogoIcon from './icons/logo-icon';

export type Props = {
  title?: string;
};

export default async function OpengraphImage(
  props?: Props
): Promise<ImageResponse> {

  const file = await readFile(join(process.cwd(), './fonts/Inter-Bold.ttf'));
  const font = Uint8Array.from(file).buffer;

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col items-center justify-center bg-white">
        <div tw="flex flex-none items-center justify-center border border-neutral-700 h-[160px] w-[160px] rounded-3xl">
          <LogoIcon width="64" height="58" fill="white" />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: font,
          style: 'normal',
          weight: 700
        }
      ]
    }
  );
}
