export default function Cover() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg text-text font-body">
      <div className="absolute inset-y-0 right-0 w-[44vw] bg-[#292038]" />
      <div className="absolute right-[6vw] top-[13vh] h-[74vh] w-[34vw] rounded-[1.2vw] border border-white/10 bg-surface p-[1.4vw]">
        <div className="flex h-[7vh] items-center justify-between border-b border-white/10 px-[1vw]">
          <div className="flex items-center gap-[0.6vw]">
            <span className="h-[1.1vw] w-[1.1vw] rounded-[0.3vw] bg-primary" />
            <span className="h-[1.1vw] w-[1.1vw] rounded-[0.3vw] bg-accent/70" />
            <span className="h-[1.1vw] w-[1.1vw] rounded-[0.3vw] bg-white/20" />
          </div>
          <div className="h-[1.2vh] w-[6vw] rounded-full bg-white/10" />
        </div>
        <div className="mt-[2.5vh] rounded-[0.8vw] border border-white/10 bg-surface-raised p-[1.4vw]">
          <div className="flex items-center justify-between">
            <span className="h-[1.4vh] w-[7vw] rounded-full bg-white/25" />
            <span className="h-[1.2vh] w-[4vw] rounded-full bg-primary/70" />
          </div>
          <div className="mt-[1.4vh] h-[1vh] w-[84%] rounded-full bg-white/15" />
          <div className="mt-[1vh] h-[1vh] w-[66%] rounded-full bg-white/10" />
          <div className="mt-[2vh] flex items-center gap-[0.7vw]">
            <span className="h-[1.7vw] w-[1.7vw] rounded-full bg-[#4b8c81]" />
            <span className="h-[1vh] w-[7vw] rounded-full bg-white/20" />
          </div>
        </div>
        <div className="mt-[1.8vh] rounded-[0.8vw] border border-white/10 bg-surface-raised p-[1.4vw]">
          <div className="flex items-center justify-between">
            <span className="h-[1.4vh] w-[5vw] rounded-full bg-white/25" />
            <span className="h-[1.2vh] w-[5vw] rounded-full bg-primary/70" />
          </div>
          <div className="mt-[1.4vh] h-[1vh] w-[80%] rounded-full bg-white/15" />
          <div className="mt-[1vh] h-[1vh] w-[58%] rounded-full bg-white/10" />
        </div>
        <div className="mt-[1.8vh] grid grid-cols-2 gap-[1vw]">
          <div className="rounded-[0.8vw] border border-white/10 bg-[#24232a] p-[1.2vw]">
            <div className="h-[1.2vh] w-[5vw] rounded-full bg-accent/70" />
            <div className="mt-[1.5vh] h-[1vh] w-[70%] rounded-full bg-white/10" />
          </div>
          <div className="rounded-[0.8vw] bg-primary p-[1.2vw] text-[#17141e]">
            <div className="h-[1.2vh] w-[4vw] rounded-full bg-[#17141e]/40" />
            <div className="mt-[1.5vh] h-[1vh] w-[70%] rounded-full bg-[#17141e]/25" />
          </div>
        </div>
        <div className="mt-[2.1vh] flex items-center gap-[0.8vw] px-[0.4vw]">
          <span className="h-[0.7vw] w-[0.7vw] rounded-full bg-accent" />
          <span className="h-[1vh] w-[42%] rounded-full bg-white/15" />
          <span className="ml-auto h-[1vh] w-[18%] rounded-full bg-white/10" />
        </div>
      </div>
      <div className="relative flex h-full w-[56vw] flex-col justify-between px-[6vw] py-[8vh]">
        <div>
          <p className="max-w-[42vw] text-[1.7vw] font-semibold uppercase tracking-[0.12em] text-accent">
            Product Management Launchpad Capstone · Step 4
          </p>
          <h1 className="mt-[8vh] max-w-[43vw] text-[6vw] font-semibold leading-[0.98] tracking-[-0.05em] text-balance">
            Fireflies Commitments
          </h1>
          <p className="mt-[4vh] max-w-[40vw] text-[2.5vw] leading-[1.25] text-muted">
            Owner-confirmed handoffs. Explicit outcomes.
          </p>
        </div>
        <p className="text-[2vw] font-medium">Kirankumar S</p>
      </div>
      <div className="absolute bottom-0 left-[56vw] h-[0.8vh] w-[44vw] bg-primary" />
    </div>
  );
}
