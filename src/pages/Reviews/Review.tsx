import customerImage1 from "../../images/customer/customer1.jpeg";
import customerImage2 from "../../images/customer/customer2.jpeg";
import customerImage3 from "../../images/customer/customer3.jpeg";
import customerImage4 from "../../images/customer/customer4.jpeg";


const reviews = [
  {
    id: 1,
    name: 'Henny K. Mark',
    location: 'Canada',
    date: '16 November 2023',
    rating: 5,
    title: 'Excellent Quality',
    content: 'Medium thickness. Did not shrink after wash. Good elasticity. XL size Perfectly fit for 5.10 height and heavy body. Did not fade after wash. Only for maroon colour t-shirt colour lightly gone in first wash but not faded. I bought 5 t-shirts of different colours. Highly recommended in so low price.',
    image:customerImage1
},
  {
    id: 2,
    name: 'Jorge Herry',
    location: 'USA',
    date: '21 December 2023',
    rating: 4,
    title: 'Good Quality',
    content: "I liked the t-shirt, it's pure cotton & skin friendly, but the size is smaller to compare standard size. Best rated.",
    image:customerImage2
  },
  {
    id: 3,
    name: 'Texa Alex',
    location: 'Germany',
    date: '26 December 2023',
    rating: 4.5,
    title: 'Good Quality',
    content: "I liked the t-shirt, it's pure cotton & skin friendly, but the size is smaller to compare standard size. Best rated.",
    image:customerImage2
  },
];

const Review = () => {
  return (
    <>
      <h4 className="text-3xl font-semibold text-black dark:text-white py-5 px-4 mb-5">Top Reviews From World</h4>
      
      <table className="min-w-full bg-slate-100 border dark:bg-transparent border-none py-4.5 px-4 dark:border-black">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b dark:text-white">Image</th>
            <th className="px-4 py-2 border-b dark:text-white">Name</th>
            <th className="px-4 py-2 border-b dark:text-white">Location</th>
            <th className="px-4 py-2 border-b dark:text-white">Rating</th>
            <th className="px-4 py-2 border-b dark:text-white">Comment</th>
            <th className="px-4 py-2 border-b dark:text-white">Review</th>
            <th className="px-4 py-2 border-b dark:text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id} className="border-b">
              <td className="px-4 py-2">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="px-4 py-2 font-medium">{review.name}</td>
              <td className="px-4 py-2">{review.location}</td>
              <td className="px-4 py-2 text-yellow-500">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={`text-yellow-500 ${index < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </td>
              <td className="px-4 py-2 text-blue-600 font-medium">{review.title}</td>
              <td className="px-4 py-2">{review.content}</td>
              <td className="px-4 py-2 text-blue-500">
                <div className="flex space-x-4">
                  <button className="text-green-600">Approve</button>
                  <button className="text-red-600">Decline</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Review;
