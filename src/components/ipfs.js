import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer';

const projectId = '2IJcpEv46U69D3bXWuO7qWB5F2q';  
// (for security concerns, consider saving these values in .env files)
const projectSecret = '8913add21c3e157cb0edcaf9fe3286a0';  
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const Ipfs = create({ 
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth
  }
});

export default Ipfs;
