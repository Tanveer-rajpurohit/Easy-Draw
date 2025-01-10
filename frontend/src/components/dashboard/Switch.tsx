interface SwitchProps {
    checked: boolean
    onChange: (checked: boolean) => void
  }
  
  export function Switch({ checked, onChange }: SwitchProps) {
    return (
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-[#2866DF]' : 'bg-[#2A2B2B]'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    )
  }
  