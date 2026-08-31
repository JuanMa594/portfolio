'use client';

import Image from 'next/image';
import { ABOUT_BIO, PROFILE_PHOTO, PROFILE_TAGS } from '../../data/about';

export function ProfileCard() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <h2 className="text-3xl font-semibold sm:text-4xl">About Me</h2>
        <p className="mt-4 text-base leading-7 opacity-80 sm:text-lg">{ABOUT_BIO.intro}</p>
        {ABOUT_BIO.paragraphs.map((paragraph, index) => (
          <p key={index} className="mt-4 text-base leading-7 opacity-70 sm:text-lg">
            {paragraph}
          </p>
        ))}

        <div className="mt-6 flex flex-wrap gap-2">
          {PROFILE_TAGS.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto w-72 overflow-hidden rounded-2xl border border-accent/20 shadow-[0_0_30px_-12px_var(--accent)] transition hover:border-accent/50 sm:w-80 lg:ml-auto lg:mr-0">
        <Image
          src={PROFILE_PHOTO}
          alt="JuanMa"
          placeholder="blur"
          sizes="(min-width: 1024px) 320px, 288px"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
