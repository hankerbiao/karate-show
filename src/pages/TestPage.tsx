import { Button } from 'antd';

function TestPage() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Hello, Tailwind and Ant Design!</h1>
            <Button type="primary" className="bg-blue-500 hover:bg-blue-700">
                Click me
            </Button>
        </div>
    );
}

export default TestPage;