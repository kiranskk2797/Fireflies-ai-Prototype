import referenceSeven from '@assets/ChatGPT_Image_Oct_29,_2026,_03_49_25_PM_1793271377462.png';
import referenceEight from '@assets/ChatGPT_Image_Oct_29,_2026,_03_49_34_PM_1793271377463.png';
import referenceNine from '@assets/ChatGPT_Image_Oct_29,_2026,_03_49_44_PM_1793271377463.png';
import referenceTen from '@assets/ChatGPT_Image_Oct_29,_2026,_03_49_52_PM_1793271377463.png';
import referenceEleven from '@assets/ChatGPT_Image_Oct_29,_2026,_03_50_02_PM_1793271377463.png';
import referenceTwelve from '@assets/ChatGPT_Image_Oct_29,_2026,_03_50_11_PM_1793271377464.png';

export default function Interface() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg text-text font-body">
      <div className="absolute left-0 top-0 h-full w-[18vw] bg-surface" />
      <div className="relative h-full px-[6vw] py-[7vh]">
        <h1 className="max-w-[84vw] text-[5.2vw] font-semibold leading-[1.02] tracking-[-0.04em] text-balance">
          A Tasks-native interface makes state visible
        </h1>
        <div className="mt-[5vh] grid grid-cols-12 gap-[2vw]">
          <div className="col-span-5 flex flex-col gap-[2.5vh] pt-[1vh]">
            <div className="flex gap-[1vw]">
              <span className="mt-[1.1vw] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-primary" />
              <p className="text-[2vw] leading-[1.28]">Meeting-grouped task cards keep source context in view</p>
            </div>
            <div className="flex gap-[1vw]">
              <span className="mt-[1.1vw] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-primary" />
              <p className="text-[2vw] leading-[1.28]">Candidate, Open, Blocked, and Awaiting acceptance use distinct labels</p>
            </div>
            <div className="flex gap-[1vw]">
              <span className="mt-[1.1vw] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-primary" />
              <p className="text-[2vw] leading-[1.28]">Owner chips, due timing, search, filters, and action feedback support scanning</p>
            </div>
            <div className="flex gap-[1vw]">
              <span className="mt-[1.1vw] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-primary" />
              <p className="text-[2vw] leading-[1.28]">Dark shell, compact task rows, subtle borders, and purple actions follow supplied screens</p>
            </div>
            <div className="flex gap-[1vw]">
              <span className="mt-[1.1vw] h-[0.6vw] w-[0.6vw] shrink-0 rounded-full bg-accent" />
              <p className="text-[2vw] leading-[1.28]">Responsive layout supports desktop and mobile</p>
            </div>
          </div>
          <div className="col-span-7 grid grid-cols-2 gap-[0.8vw]">
            <div className="h-[19vh] overflow-hidden rounded-[0.8vw] border border-white/10 bg-surface"><img src={referenceSeven} crossOrigin="anonymous" alt="Supplied Fireflies interface reference 7" className="h-full w-full object-cover" /></div>
            <div className="h-[19vh] overflow-hidden rounded-[0.8vw] border border-white/10 bg-surface"><img src={referenceEight} crossOrigin="anonymous" alt="Supplied Fireflies interface reference 8" className="h-full w-full object-cover" /></div>
            <div className="h-[19vh] overflow-hidden rounded-[0.8vw] border border-white/10 bg-surface"><img src={referenceNine} crossOrigin="anonymous" alt="Supplied Fireflies interface reference 9" className="h-full w-full object-cover" /></div>
            <div className="h-[19vh] overflow-hidden rounded-[0.8vw] border border-white/10 bg-surface"><img src={referenceTen} crossOrigin="anonymous" alt="Supplied Fireflies interface reference 10" className="h-full w-full object-cover" /></div>
            <div className="h-[19vh] overflow-hidden rounded-[0.8vw] border border-white/10 bg-surface"><img src={referenceEleven} crossOrigin="anonymous" alt="Supplied Fireflies interface reference 11" className="h-full w-full object-cover" /></div>
            <div className="h-[19vh] overflow-hidden rounded-[0.8vw] border border-white/10 bg-surface"><img src={referenceTwelve} crossOrigin="anonymous" alt="Supplied Fireflies interface reference 12" className="h-full w-full object-cover" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
