import { Tier } from "./models/Tier";
import { Review } from "./models/Review";
import { ProductType } from "./models/ProductType";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64 is-square">
              {/* eslint-disable-next-line */}
              <img
                className="picture is-rounded"
                src={review.product.imageUrl}
              />
            </figure>
          </div>
          <div className="media-content no-scrolling">
            <p className="subtitle is-6 text-ellipsis">
              {review.product.brand}
            </p>
            <p className="title is-4">{review.product.name}</p>
          </div>
          <div className="media-right">
            <span
              className={`tag is-large ${Tier.getTagClassName(review.tier)}`}
            >
              {review.tier}
            </span>
          </div>
        </div>
        <h4 className="title is-4">Good</h4>
        {review.good.map((data, index) => (
          <div className="icon-text" key={index}>
            <span className="icon has-text-success">
              <i className="fa-solid fa-plus"></i>
            </span>
            <span>{data}</span>
          </div>
        ))}
        <h4 className="title is-4 mt-5">Bad</h4>
        {review.bad.map((data, index) => (
          <div className="icon-text" key={index}>
            <span className="icon has-text-danger">
              <i className="fa-solid fa-minus"></i>
            </span>
            <span>{data}</span>
          </div>
        ))}
        <h4 className="title is-4 mt-5">About</h4>
        {review.comparison ? (
          <div className="icon-text">
            <span className="icon has-text-info">
              <i className="fa-solid fa-comment-dots"></i>
            </span>
            <span>{review.comparison}</span>
          </div>
        ) : null}
        <div className="icon-text">
          <span className="icon has-text-info">
            <i className="fa-solid fa-puzzle-piece"></i>
          </span>
          <span>{ProductType.toString(review.product.type)}</span>
        </div>
        <div className="icon-text">
          <span className="icon has-text-info">
            <i className="fa-solid fa-fire"></i>
          </span>
          <span>{`${review.product.portionCaloriesInKcal}kcal per portion`}</span>
        </div>
        <div className="icon-text">
          <span className="icon has-text-info">
            <i className="fa-solid fa-dumbbell"></i>
          </span>
          <span>{`${review.product.portionProteinInGrams}g of protein per portion (${(review.product.portionCaloriesInKcal / review.product.portionProteinInGrams).toFixed(2)}kcal per gram)`}</span>
        </div>
        <div className="icon-text">
          <span className="icon has-text-info">
            <i className="fa-solid fa-weight-hanging"></i>
          </span>
          <span>{`${review.product.portionWeightInGrams}g per portion`}</span>
        </div>
        <div className="icon-text">
          <span className="icon has-text-info">
            <i className="fa-solid fa-calendar"></i>
          </span>
          <span>Reviewed in {review.year}</span>
        </div>
      </div>
    </div>
  );
}
