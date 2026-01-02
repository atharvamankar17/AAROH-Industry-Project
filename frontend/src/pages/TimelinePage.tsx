import PraharTimeline from "@/components/PraharTimeline";

const TimelinePage = () => {
  // Optional: to highlight fetch from api
  const currentPrahar = "NULL";  
  return (
    <div className="min-h-screen bg-background py-10 px-4 md:px-0 flex flex-col items-center">

      {/* Timeline Container */}
      <div className="w-full max-w-5xl">
        {/* Pass showAllDescriptions to show all descriptions, but keep current prahar highlighted */}
        <PraharTimeline currentPrahar={currentPrahar} showAllDescriptions />
      </div>

      {/* Optional Footer / Note */}
      <p className="text-xs text-muted-foreground mt-6 text-center">
        Explore the different praahars of the day and their recommended raagas.
      </p>
    </div>
  );
};

export default TimelinePage;
