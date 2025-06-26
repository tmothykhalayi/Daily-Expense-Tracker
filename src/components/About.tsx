function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            About <span className="text-teal-600">Us</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We help you manage your daily expenses easily and efficiently. Track your spending, set budgets, and gain control of your finances.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To empower users to take charge of their financial health by providing a simple, intuitive tool for tracking daily expenses and budgets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">What We Offer</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Easy expense logging</li>
                <li>• Customizable budget categories</li>
                <li>• Insightful spending reports</li>
                <li>• Secure data management</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Why Choose Us</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• User-friendly interface</li>
                <li>• Real-time budget tracking</li>
                <li>• Data privacy guaranteed</li>
                <li>• Continuous feature updates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
