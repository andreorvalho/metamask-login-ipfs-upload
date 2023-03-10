import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer';

const auth = 'Basic ' + Buffer.from(process.env.REACT_APP_PROJECT_ID + ':' + process.env.REACT_APP_PROJECT_SECRET).toString('base64');

const Ipfs = create({ 
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth
  }
});

export default Ipfs;
