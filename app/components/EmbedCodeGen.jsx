import { toast } from "sonner";

const EmbedCodeGenerator = ({ spaceName }) => {
    const embedCode = `<iframe 
    src="${process.env.NEXT_PUBLIC_URL}/embed?spaceName=${spaceName}" 
    style="border:none;width:600px;height:200px;" 
    scrolling="no">
    </iframe>`;
  
    const copyToClipboard = () => {
      navigator.clipboard.writeText(embedCode);
      toast.success("Embed code copied to clipboard!");
    };
  
    return (
      <div>
        <button onClick={copyToClipboard} className="mt-2 bg-purple-500 text-white py-2 px-4 rounded">
          <p className="font-bold">Copy Embeded code</p>
        </button>
      </div>
    );
  };
  
  export default EmbedCodeGenerator;
  