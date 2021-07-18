import { ReactNode } from 'react';
import '../styles/questions.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
};

export function Question({ content, author, children }: QuestionProps) {
  return (
    <div className='question'>
      <p>{content}</p>
      <footer>
        <div className='userInfo'>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>

        <div className='buttons'>{children}</div>
      </footer>
    </div>
  );
}
