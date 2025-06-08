
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const SizeGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="bg-jet-black text-white p-6 min-h-screen">
          <div className="max-w-4xl mx-auto py-16">
            <h1 className="text-4xl font-bold mb-6 text-white" data-aos="fade-down">Size Guide</h1>
            <p className="text-zinc-400 mb-8 text-lg" data-aos="fade-down" data-aos-delay="100">Find the perfect fit for your style.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12" data-aos="fade-up" data-aos-delay="200">
              <div data-aos="fade-right" data-aos-delay="300">
                <h2 className="text-2xl font-semibold mb-4 text-white">Men's Sizing</h2>
                <div className="bg-carbon-grey rounded-xl p-6">
                  <table className="w-full text-white">
                    <thead>
                      <tr className="border-b border-zinc-600">
                        <th className="text-left py-2">Size</th>
                        <th className="text-left py-2">Chest (in)</th>
                        <th className="text-left py-2">Length (in)</th>
                      </tr>
                    </thead>
                    <tbody className="text-zinc-400">
                      <tr><td>S</td><td>36-38</td><td>27</td></tr>
                      <tr><td>M</td><td>38-40</td><td>28</td></tr>
                      <tr><td>L</td><td>40-42</td><td>29</td></tr>
                      <tr><td>XL</td><td>42-44</td><td>30</td></tr>
                      <tr><td>XXL</td><td>44-46</td><td>31</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div data-aos="fade-left" data-aos-delay="400">
                <h2 className="text-2xl font-semibold mb-4 text-white">Women's Sizing</h2>
                <div className="bg-carbon-grey rounded-xl p-6">
                  <table className="w-full text-white">
                    <thead>
                      <tr className="border-b border-zinc-600">
                        <th className="text-left py-2">Size</th>
                        <th className="text-left py-2">Chest (in)</th>
                        <th className="text-left py-2">Length (in)</th>
                      </tr>
                    </thead>
                    <tbody className="text-zinc-400">
                      <tr><td>XS</td><td>30-32</td><td>24</td></tr>
                      <tr><td>S</td><td>32-34</td><td>25</td></tr>
                      <tr><td>M</td><td>34-36</td><td>26</td></tr>
                      <tr><td>L</td><td>36-38</td><td>27</td></tr>
                      <tr><td>XL</td><td>38-40</td><td>28</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="bg-carbon-grey rounded-xl p-8 text-center" data-aos="zoom-in" data-aos-delay="500">
              <h3 className="text-xl font-semibold mb-4 text-white">Sizing Tips</h3>
              <p className="text-zinc-400 mb-4">All measurements are in inches. For the best fit, measure yourself wearing the undergarments you plan to wear with the item.</p>
              <p className="text-zinc-400">If you're between sizes, we recommend sizing up for a more relaxed fit or sizing down for a more fitted look.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SizeGuide;
