import { ReactNode } from 'react';
import '../styles/question.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
  isAnswered: boolean;
  isHighlighted: boolean;
}

export const Question = ({ content, author, children, isAnswered, isHighlighted }: QuestionProps) => {
  return (
    <div className={`question ${isAnswered ? "answered" : ""} ${isHighlighted ? "highlighted" : ""}`}>
      <p>{content}</p>

      <footer>
        <div className="user-info">
          <img src={author.avatar} />
          <span>{author.name}</span>
        </div>

        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}
