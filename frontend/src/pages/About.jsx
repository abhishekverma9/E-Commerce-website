import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa, consequuntur doloremque tempora eos voluptatibus cum ipsam molestiae quidem, veritatis odio provident quibusdam optio delectus id eum officiis! Consequuntur quis dolor quas! Deserunt voluptates vero, ea ipsa a veritatis aliquid, et similique soluta odit aliquam quis ab itaque perspiciatis magni nesciunt consequuntur molestias necessitatibus atque repellendus officia ad consectetur autem facilis.</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa, consequuntur doloremque tempora eos voluptatibus cum ipsam molestiae quidem, veritatis odio provident quibusdam optio delectus id eum officiis! Consequuntur quis dolor quas! Deserunt voluptates vero, ea ipsa a veritatis aliquid, et similique soluta odit aliquam quis ab itaque perspiciatis magni nesciunt consequuntur molestias necessitatibus atque repellendus officia ad consectetur autem facilis.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, consequatur. Deleniti vel itaque possimus. Magnam autem perferendis, fugiat veritatis modi dignissimos quo, nobis numquam doloribus enim aperiam, aliquam natus. Quo dolore nesciunt necessitatibus consectetur.</p>
        </div>
      </div>

      <div className="text-4xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam minus sit debitis pariatur corrupti sunt praesentium ducimus, cum error nostrum enim natus? Eveniet corrupti vitae unde cum eos, quidem at iste explicabo odit dolores!</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam minus sit debitis pariatur corrupti sunt praesentium ducimus, cum error nostrum enim natus? Eveniet corrupti vitae unde cum eos, quidem at iste explicabo odit dolores!</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam minus sit debitis pariatur corrupti sunt praesentium ducimus, cum error nostrum enim natus? Eveniet corrupti vitae unde cum eos, quidem at iste explicabo odit dolores!</p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About
