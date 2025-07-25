import { ReactFlowProvider } from 'reactflow';
import FlowBuilder from './components/FlowBuilder';

const App = () => (
  <ReactFlowProvider>
    <FlowBuilder />
  </ReactFlowProvider>
);

export default App;
