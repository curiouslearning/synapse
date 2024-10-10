import { NextApiRequest, NextApiResponse } from 'next';
import { adminDB } from '../../../config/firebaseAdmin'; // Adjust the import path as needed
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { flowId } = req.query;

    if (!flowId || typeof flowId !== 'string') {
      return res.status(400).json({ error: 'Invalid flow ID' });
    }

    const docRef = adminDB.collection('ContentMover').doc('appFlowsDoc');
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      const data = docSnapshot.data();
      let appFlows = data?.appFlows || [];
      
      // Filter out the flow with the matching ID
      const updatedFlows = appFlows.filter((flow: any) => flow.id !== flowId);

      if (appFlows.length === updatedFlows.length) {
        return res.status(404).json({ error: 'Flow not found' });
      }

      // Update the document with the new array of flows
      await docRef.update({ appFlows: updatedFlows });

      res.status(200).json({ message: 'Flow deleted successfully' });
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (error) {
    console.error('Error deleting flow:', error);
    res.status(500).json({ error: 'Failed to delete flow' });
  }
}
