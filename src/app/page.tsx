import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ヘッダー */}
      <header className="fixed w-full bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-sm z-10">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Company</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#top" className="hover:text-blue-500 transition-colors">TOP</a></li>
              <li><a href="#about" className="hover:text-blue-500 transition-colors">About</a></li>
              <li><a href="#services" className="hover:text-blue-500 transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* TOP画像セクション */}
      <section id="top" className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/vercel.svg"
            alt="Hero Image"
            fill
            className="object-cover dark:invert"
            priority
          />
        </div>
        <div className="relative z-1 text-center p-6 bg-white/70 dark:bg-black/70 backdrop-blur-md rounded-lg">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our Company</h2>
          <p className="text-xl max-w-2xl mx-auto">
            We provide innovative solutions for your business needs
          </p>
        </div>
      </section>

      {/* About セクション */}
      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">About Us</h2>
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <Image
                src="/globe.svg"
                alt="About us"
                width={400}
                height={400}
                className="rounded-lg dark:invert"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold mb-4">Our Story</h3>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nullam eget felis eget urna ultricies accumsan.
                Vivamus auctor, felis at convallis dapibus, ex dolor bibendum sem,
                vel fringilla justo enim vel magna.
              </p>
              <p>
                Proin maximus, metus vel mattis elementum, eros dolor sagittis magna,
                eget commodo massa tellus eget sapien. Nullam tristique risus et dolor imperdiet,
                id euismod felis faucibus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services セクション */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full">
                <Image
                  src="/file.svg"
                  alt="Service icon"
                  width={32}
                  height={32}
                  className="dark:invert"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Web Development</h3>
              <p className="text-center">
                We create responsive, user-friendly websites that help your business grow online.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-green-100 dark:bg-green-900 rounded-full">
                <Image
                  src="/window.svg"
                  alt="Service icon"
                  width={32}
                  height={32}
                  className="dark:invert"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">UX/UI Design</h3>
              <p className="text-center">
                We design intuitive and engaging user experiences that convert visitors into customers.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-purple-100 dark:bg-purple-900 rounded-full">
                <Image
                  src="/globe.svg"
                  alt="Service icon"
                  width={32}
                  height={32}
                  className="dark:invert"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Digital Marketing</h3>
              <p className="text-center">
                We help you reach your target audience and grow your business through effective digital marketing strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact セクション */}
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Contact Us</h2>
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <form>
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Your name"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Your email"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold">Company</h3>
              <p className="mt-2">Building the future, one project at a time.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Connect with us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400 transition-colors">Twitter</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Facebook</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Instagram</a>
                <a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
