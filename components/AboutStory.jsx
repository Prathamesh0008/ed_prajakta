export default function AboutStory() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Title */}
          <div>
            <div className="sticky top-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                About <br />
                <span className="bg-gradient-to-r from-[#8B0035] to-[#F4C430] bg-clip-text text-transparent">
                  Our Journey
                </span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-[#8B0035] to-[#F4C430] rounded-full" />
            </div>
          </div>
          
          {/* Right Column - Story */}
          <div className="space-y-8">
            <div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu est ultrices, 
                pharetra nisi et, eleifend ipsum. Praesent lectus elit, tempor non ipsum non. 
                Curabitur tempus risus vel sagittis feugiat. Ut nec enim sagittis, imperdiet 
                eros in, pulvinar magna.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Suspendisse auctor sapien non tempor lobortis. Integer vel quam vel ipsum 
                consectetur ultricies. Vivamus ac nunc sit amet libero tincidunt aliquet.
              </p>
            </div>
            
            {/* Separator */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#8B0035] to-transparent my-8" />
            
            {/* Bullet Points */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#8B0035]/20 to-[#F4C430]/20 flex items-center justify-center mt-1 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#8B0035]" />
                </div>
                <p className="text-gray-700">Aliquam mi est, pulvinar in ultrices quis</p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#8B0035]/20 to-[#F4C430]/20 flex items-center justify-center mt-1 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#8B0035]" />
                </div>
                <p className="text-gray-700">In ac neque id quam facilisis malesuada</p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#8B0035]/20 to-[#F4C430]/20 flex items-center justify-center mt-1 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#8B0035]" />
                </div>
                <p className="text-gray-700">Mauris bibendum turpis mauris dignissim</p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#8B0035]/20 to-[#F4C430]/20 flex items-center justify-center mt-1 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#8B0035]" />
                </div>
                <p className="text-gray-700">Etiam nisl arcu, laoreet vel feugiat in quis</p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#8B0035]/20 to-[#F4C430]/20 flex items-center justify-center mt-1 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#8B0035]" />
                </div>
                <p className="text-gray-700">Suspendisse auctor sapien non tempor lobortis</p>
              </div>
            </div>
            
            {/* Years of Experience Card */}
            <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-[#8B0035]/5 to-[#F4C430]/5 border border-[#8B0035]/10 -ml-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-[#8B0035] mb-2">20+</div>
                <div className="text-xl font-semibold text-gray-900">Years of Experience</div>
                <p className="text-gray-600 mt-2">
                  Delivering excellence in pharmaceutical solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}