import { NextApiRequest, NextApiResponse } from 'next';
import { adminDB } from '../../../config/firebaseAdmin'; // Adjust the import path as needed
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const docRef = adminDB.collection('ContentMover').doc('appFlowsDoc');
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      const data = docSnapshot.data();
      const appFlows = data?.appFlows || [];

      res.status(200).json({ flows: appFlows });
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (error) {
    console.error('Error fetching flows:', error);
    res.status(500).json({ error: 'Failed to fetch flows' });
  }
}
