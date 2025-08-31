import { useState } from "react";

interface LicenseModalProps {
  onVerify: (key: string) => void;
  onClose: () => void;
}

export default function LicenseModal({ onVerify, onClose }: LicenseModalProps) {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await onVerify(key);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-96">
        <h2 className="text-lg font-bold mb-3">🔑 Enter License Key</h2>
        <input
          type="text"
          placeholder="Enter Gumroad license key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-3 py-2 bg-green-600 text-white rounded"
          >
            {loading ? "Verifying..." : "Verify & Download"}
          </button>
        </div>
      </div>
    </div>
  );
}
