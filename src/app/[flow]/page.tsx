import fs from "fs";
import path from "path";
import { AppFlowEntry, NextEntry } from "@/pages/dashboard";
import { notFound } from "next/navigation";
import Home from "./client-component";

const fetchEntries = async (): Promise<AppFlowEntry[]> => {
  const filePath = path.join(process.cwd(), 'data', 'app-flows.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
};

const getFlowByFlowName = async (flow: string): Promise<AppFlowEntry | null> => {
  const entries = await fetchEntries();
  return entries.find(entry => entry.id === flow) || null;
};

const ServerComponent = async ({ params }: { params: { flow: string } }) => {
  const { flow } = params;
  const selectedEntry = await getFlowByFlowName(flow);

  console.log('Selected Entry', params);

  if (!selectedEntry) {
    notFound();
  }

  const initialURL = selectedEntry.flow[0]?.url || '';

  // Pass data to the client-side component
  return (
    <Home initialURL={initialURL} selectedEntry={selectedEntry} />
  );
};

export default ServerComponent;