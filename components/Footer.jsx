//edpharma-webshop\components\Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-[#8B0035]">
      <div className="max-w-7xl mx-auto px-6 py-16 text-white">

        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-bold">ED Pharma</h3>
            <p className="mt-4 text-sm opacity-90 leading-relaxed">
              Trusted pharmaceutical solutions with global reach
              and uncompromised quality.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>Home</li>
              <li>Products</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-sm">support@edpharma.com</p>
            <p className="text-sm mt-4 opacity-80">
              © {new Date().getFullYear()} ED Pharma
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
