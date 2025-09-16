import React from 'react'

const AboutMe: React.FC = () => {
  return (
    <div className="w-full">
      {/* Title Section */}
      <div className="bg-secondary-900 text-white py-16 px-6 flex flex-col items-center justify-center">
        <h1 className="text-5xl justify-center align-center font-bold mb-4">About Me</h1>
        <p className="text-xl opacity-90 justify-center align-center">Passionate software engineer</p>
      </div>

      {/* Two Column Content Section */}
      <div className="bg-white py-16 px-6 flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl align-center justify-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight">
              Building the future through innovative data visualization and analytics
            </h2>
          </div>
          <div>
            <p className="text-gray-700 leading-relaxed text-lg">
              With a background spanning both theoretical physics and practical computer science, I've 
              developed a unique perspective on how data tells stories across different scientific domains. 
              My goal is to bridge the gap between raw data and meaningful insights through innovative 
              visualization techniques that make complex information accessible and compelling.
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Values and Principles Section */}
      <div className="bg-white py-16 px-6">
        <div className="grid md:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Company Values Column */}
          <div className="flex flex-col">
            <div className="align-center flex flex-col items-center mb-12">
                <h2 className="text-3xl font-bold text-secondary-900 leading-tight text-center">
                    Company Values
                </h2>
                <p className="text-secondary-600 text-md text-center max-w-sm">
                    How I fit the blueprint to be successful at Freshpaint.
                </p>
            </div>
          
            <div className="space-y-12">
              <div className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-10">
                <div className="md:col-span-2">
                  <span className="text-xl font-bold text-secondary-900">01.</span>
                </div>
                  <h3 className="text-xl font-bold text-accent-500 mb-4">High Slope</h3>
                  <ul className="ml-4">
                      <li className="text-gray-700 leading-relaxed flex items-start">
                        <span className="text-secondary-900 mr-2 mt-1">•</span>
                        <span>While I am not the most experienced engineer, I am eager to work hard and learn what I need to make an impact fast.</span>
                      </li>
                      <li className="text-gray-700 leading-relaxed flex items-start">
                        <span className="text-secondary-900 mr-2 mt-1">•</span>
                        <span>For me, "high slope" means learning new technologies/skills and applying them to real-world problems, fast.</span>
                      </li>
                      <li className="text-gray-700 leading-relaxed flex items-start">
                        <span className="text-secondary-900 mr-2 mt-1">•</span>
                        <span>Freshpaint's emphasis on learning is a major plus for me. I believe that there are very few things that can't be learned if one is willing to put in the work.</span>
                      </li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-10">
                <div className="md:col-span-2">
                  <span className="text-xl font-bold text-secondary-900">02.</span>
                </div>
                  <h3 className="text-xl font-bold text-accent-500 mb-4">Ignore Walls</h3>
                  <ul className="ml-4">
                      <li className="text-gray-700 leading-relaxed flex items-start">
                        <span className="text-secondary-900 mr-2 mt-1">•</span>
                        <span>Finding solutions to problems is the whole reason I got started in software development. I love the challenge of figuring out how to make things work.</span>
                      </li>
                      <li className="text-gray-700 leading-relaxed flex items-start">
                        <span className="text-secondary-900 mr-2 mt-1">•</span>
                        <span>I've rewritten engine tools to run at runtime, containerized tools that were never meant to be, and found creative solutions to complex problems.</span>
                      </li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-10">
                <div className="md:col-span-2">
                  <span className="text-xl font-bold text-secondary-900">03.</span>
                </div>
                  <h3 className="text-xl font-bold text-accent-500 mb-4">EQ &gt; IQ</h3>
                  <ul className="ml-4">
                      <li className="text-gray-700 leading-relaxed flex items-start">
                        <span className="text-secondary-900 mr-2 mt-1">•</span>
                        <span>I believe in collaborative problem-solving and learning from others' perspectives.</span>
                      </li>
                      <li className="text-gray-700 leading-relaxed flex items-start">
                        <span className="text-secondary-900 mr-2 mt-1">•</span>
                        <span>Emotional intelligence and empathy are crucial for building effective teams and understanding user needs.</span>
                      </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Execution Principles Column */}
          <div className="flex flex-col">
            <div className="align-center flex flex-col items-center mb-12">
                <h2 className="text-3xl font-bold text-secondary-900 leading-tight text-center">
                    Execution Principles
                </h2>
                <p className="text-secondary-600 text-md text-center max-w-sm">
                    How I align with the shared set of principles that help us all work together successfully.
                </p>
            </div>
          
          <div className="space-y-12">
            <div className="grid md:grid-cols-12">
              <div className="md:col-span-10">
              <div className="md:col-span-2">
                <span className="text-xl font-bold text-secondary-900">01.</span>
              </div>
                <h3 className="text-xl font-bold text-accent-500 mb-4">Customer Comes First</h3>
                <ul className="ml-4">
                    <li className="text-gray-700 leading-relaxed flex items-start">
                      <span className="text-secondary-900 mr-2 mt-1">•</span>
                      <span>Having worked directly with customers, I understand the importance of listening to their needs and delivering a great customer experience.</span>
                    </li>
                    <li className="text-gray-700 leading-relaxed flex items-start">
                      <span className="text-secondary-900 mr-2 mt-1">•</span>
                      <span>One major lesson I took away from my time at Amazon was that cutomer trust is hard to earn and easy to lose. Going above and beyond to make the customer happy is key to maintaining that trust.</span>
                    </li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-10">
              <div className="md:col-span-2">
                <span className="text-xl font-bold text-secondary-900">02.</span>
              </div>
                <h3 className="text-xl font-bold text-accent-500 mb-4">Be the CEO</h3>
                <ul className="ml-4">
                    <li className="text-gray-700 leading-relaxed flex items-start">
                      <span className="text-secondary-900 mr-2 mt-1">•</span>
                      <span>"SOMETHING HERE"</span>
                    </li>
                    <li className="text-gray-700 leading-relaxed flex items-start">
                      <span className="text-secondary-900 mr-2 mt-1">•</span>
                      <span>Another lesson I took away from my time at Amazon was that most decisions are "Two-way doors" meaning that decisions can be undone. In these instances, it is often best to ask for forgiveness rather than permission.</span>
                    </li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-10">
              <div className="md:col-span-2">
                <span className="text-xl font-bold text-secondary-900">03.</span>
              </div>
                <h3 className="text-xl font-bold text-accent-500 mb-4">See It, Say It, Fix it</h3>
                <ul className="ml-4">
                    <li className="text-gray-700 leading-relaxed flex items-start">
                      <span className="text-secondary-900 mr-2 mt-1">•</span>
                      <span>I have always been a strong believer that no one knows everything and that we can learn from each other. Open, respectful, and transparent communication is key to success. Especially in an engineering context, being open to feedback and receptive to criticism is key to growth.</span>
                    </li>
                    <li className="text-gray-700 leading-relaxed flex items-start">
                      <span className="text-secondary-900 mr-2 mt-1">•</span>
                      <span>Personal responsibility, ownership, and accountability are values I find important. I think it is nearly impossible to fix things if no one is willing to acknowledge their own mistakes.</span>
                    </li>
                </ul>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutMe
