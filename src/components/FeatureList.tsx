import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  CogIcon,
  LockClosedIcon,
  ServerIcon,
  ShieldCheckIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "Privacy by Default",
    description:
      "We don't store any identifying information - only an anonymous email of your choice",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Community Verified Algorithms",
    description:
      "Generate truly pseudo-random mnemonics with the latest in cryptography research",
    icon: LockClosedIcon,
  },
  {
    name: "Unlimited Uses",
    description: "Generate as many wallets as you'd like with a single license",
    icon: ArrowPathIcon,
  },
  {
    name: "Offline Generation supported",
    description:
      "All the code runs locally in your browser - feel free to disable internet access and generate your keys",
    icon: ShieldCheckIcon,
  },
  {
    name: "Easy Configuration",
    description:
      "Get started on using your new wallet immediately - we provide an easy way to generate QR codes and braille equivalents for your wallets. ",
    icon: CogIcon,
  },
  {
    name: "Withstand the test of time",
    description:
      "No existing provider out there integrates natively with braille, that's a big security risk out of your mind",
    icon: ServerIcon,
  },
];

const FeatureList = () => {
  return (
    <div className="relative bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-lg font-semibold text-cyan-600">Our Features</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Everything you need to get started on your crypto journey
        </p>
        <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
          Everything you need, nothing you don&apos;t.
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-teal-500 to-cyan-600 p-3 shadow-lg">
                        <feature.icon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureList;
