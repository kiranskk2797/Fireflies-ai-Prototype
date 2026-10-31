import referenceOne from '@assets/ChatGPT_Image_Oct_29,_2026,_03_48_18_PM_1793271377461.png';
import referenceTwo from '@assets/ChatGPT_Image_Oct_29,_2026,_03_48_32_PM_1793271377461.png';
import referenceThree from '@assets/ChatGPT_Image_Oct_29,_2026,_03_48_45_PM_1793271377461.png';
import referenceFour from '@assets/ChatGPT_Image_Oct_29,_2026,_03_48_58_PM_1793271377462.png';
import referenceFive from '@assets/ChatGPT_Image_Oct_29,_2026,_03_49_05_PM_1793271377462.png';
import referenceSix from '@assets/ChatGPT_Image_Oct_29,_2026,_03_49_14_PM_1793271377462.png';

export default function Scope() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg text-text font-body">
      <div className="h-full px-[6vw] py-[7vh]">
        <h1 className="max-w-[86vw] text-[5.2vw] font-semibold leading-[1.02] tracking-[-0.04em] text-balance">
          Keep the solution inside the existing Tasks experience
        </h1>
        <div className="mt-[4vh] grid grid-cols-12 gap-[2vw]">
          <div className="col-span-5 flex flex-col gap-[2.3vh] pt-[1vh]">
            <div className="flex gap-[1vw]">
              <span className="mt-[1.1vw] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-primary" />
              <p className="text-[2vw] leading-[1.27]">Start from the visible Fireflies shell: left navigation, meeting groups, task rows, and owner cues</p>
            </div>
            <div className="flex gap-[1vw]">
              <span className="mt-[1.1vw] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-primary" />
              <p className="text-[2vw] leading-[1.27]">Treat every extracted phrase as a Candidate</p>
            </div>
            <div className="flex gap-[1vw]">
              <span className="mt-[1.1vw] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-primary" />
              <p className="text-[2vw] leading-[1.27]">Ask the proposed owner to confirm before activation</p>
            </div>
            <div className="flex gap-[1vw]">
              <span className="mt-[1.1vw] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-primary" />
              <p className="text-[2vw] leading-[1.27]">Support explicit resolution without adding another project board</p>
            </div>
            <div className="flex gap-[1vw]">
              <span className="mt-[1.1vw] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-primary" />
              <p className="text-[2vw] leading-[1.27]">Scope: handoff and resolution—not transcription, integrations, or notification delivery</p>
            </div>
          </div>
          <div className="col-span-7 grid grid-cols-2 gap-[0.8vw]">
            <div className="h-[19vh] overflow-hidden rounded-[0.8vw] border border-white/10 bg-surface"><img src={referenceOne} crossOrigin="anonymous" alt="Supplied Fireflies interface reference 1" className="h-full w-full object-cover" /></div>
            <div className="h-[19vh] overflow-hidden rounded-[0.8vw] border border-white/10 bg-surface"><img src={referenceTwo} crossOrigin="anonymous" alt="Supplied Fireflies interface reference 2" className="h-full w-full object-cover" /></div>
            <div className="h-[19vh] overflow-hidden rounded-[0.8vw] border border-white/10 bg-surface"><img src={referenceThree} crossOrigin="anonymous" alt="Supplied Fireflies interface reference 3" className="h-full w-full object-cover" /></div>
            <div className="h-[19vh] overflow-hidden rounded-[0.8vw] border border-white/10 bg-surface"><img src={referenceFour} crossOrigin="anonymous" alt="Supplied Fireflies interface reference 4" className="h-full w-full object-cover" /></div>
            <div className="h-[19vh] overflow-hidden rounded-[0.8vw] border border-white/10 bg-surface"><img src={referenceFive} crossOrigin="anonymous" alt="Supplied Fireflies interface reference 5" className="h-full w-full object-cover" /></div>
            <div className="h-[19vh] overflow-hidden rounded-[0.8vw] border border-white/10 bg-surface"><img src={referenceSix} crossOrigin="anonymous" alt="Supplied Fireflies interface reference 6" className="h-full w-full object-cover" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
