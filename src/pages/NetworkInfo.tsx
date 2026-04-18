import { Server, Monitor, ArrowRightLeft } from "lucide-react";

export default function NetworkInfo() {
  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold">Network Simulation Info</h2>

      <div className="bg-card rounded-xl shadow-md border p-6 space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Server className="h-5 w-5 text-primary" /> Client-Server Model
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          In this system, the <strong className="text-foreground">client</strong> (browser) sends HTTP requests
          to the <strong className="text-foreground">server</strong>, which processes the data and responds with
          results. The frontend is responsible for presenting data, while the backend handles storage and logic.
        </p>
      </div>

      <div className="bg-card rounded-xl shadow-md border p-6 space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5 text-accent" /> Data Flow
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          When a student record is submitted, the data travels from the form (client) to the server via an API call.
          The server validates and stores the data, then sends a confirmation back to the client.
        </p>
      </div>

      {/* Diagram placeholder */}
      <div className="bg-card rounded-xl shadow-md border p-8">
        <h3 className="text-lg font-semibold mb-6">System Architecture Diagram</h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-2 p-6 bg-primary/10 rounded-xl w-40">
            <Monitor className="h-10 w-10 text-primary" />
            <span className="font-semibold text-sm">Client</span>
            <span className="text-xs text-muted-foreground">React App</span>
          </div>
          <div className="flex flex-col items-center">
            <ArrowRightLeft className="h-8 w-8 text-muted-foreground" />
            <span className="text-xs text-muted-foreground mt-1">HTTP / API</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-6 bg-accent/10 rounded-xl w-40">
            <Server className="h-10 w-10 text-accent" />
            <span className="font-semibold text-sm">Server</span>
            <span className="text-xs text-muted-foreground">Backend API</span>
          </div>
        </div>
      </div>
    </div>
  );
}
