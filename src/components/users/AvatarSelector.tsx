import React from 'react';

import avatar1 from '@/assets/avatars/avatar1.png';
import avatar2 from '@/assets/avatars/avatar2.png';
import avatar3 from '@/assets/avatars/avatar3.png';
import avatar4 from '@/assets/avatars/avatar4.png';

export const avatarMap: Record<string, string> = {
  avatar1,
  avatar2,
  avatar3,
  avatar4,
};

interface AvatarSelectorProps {
  value: string;
  onChange: (avatar: string) => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ value, onChange }) => (
  <div className="flex gap-2 flex-wrap">
    {Object.entries(avatarMap).map(([name, src], idx) => (
      <button
        type="button"
        key={name}
        onClick={() => onChange(name)}
        className={`rounded-full border-2 p-1 transition-all ${
          value === name
            ? 'border-primary ring-2 ring-primary'
            : 'border-transparent'
        }`}
      >
        <img
          src={src}
          alt={`Avatar ${idx + 1}`}
          className="w-14 h-14 rounded-full object-cover"
        />
      </button>
    ))}
  </div>
);

export default AvatarSelector;
