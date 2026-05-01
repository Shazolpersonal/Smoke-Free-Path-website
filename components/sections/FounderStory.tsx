"use client";

import { SectionWrapper, StoryLetter } from "@/components/ui";
import { copyBn } from "@/content";

export function FounderStory() {
  const s = copyBn.story;
  return (
    <SectionWrapper id="founder-story" bgVariant="sepia">
      <StoryLetter
        heading={s.heading}
        paragraphs={s.paragraphs}
        signature={s.signature}
        role={s.role}
        note={s.note}
        kicker={s.kicker}
        chapterLabel={s.chapterLabel}
        chapters={s.chapters}
        emphasisParagraphIndices={s.emphasisParagraphIndices}
        diaryIntroIndex={s.diaryIntroIndex}
        diaryParagraphIndex={s.diaryParagraphIndex}
        factParagraphIndices={s.factParagraphIndices}
        promiseParagraphIndices={s.promiseParagraphIndices}
        closingBlessingIndex={s.closingBlessingIndex}
        noteTitle={s.noteTitle}
        closingCta={s.closingCta}
        className="font-noto-sans-bengali"
      />
    </SectionWrapper>
  );
}
