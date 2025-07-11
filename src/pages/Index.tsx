import { useState } from "react";

const Index = () => {
  console.log("Index component rendering");
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold text-center py-20">
        Hello World - Testing React
      </h1>
    </div>
  );
};

export default Index;