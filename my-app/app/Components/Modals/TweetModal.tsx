import { CloseTweetForm } from '@/app/Redux/dialog/Actions';
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import EmojiPicker from 'emoji-picker-react';

interface tweet {
    open?: boolean,
    onClose?: () => void,
    AddTweet: (content: string) => void,
}
const TweetModal: React.FC<tweet> = ({ open, onClose, AddTweet }) => {
    const dispatch = useDispatch()
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [postContent, setPostContent] = useState('');
    const [showCustomEmojiPicker, setShowCustomEmojiPicker] = useState(false);
    const handleSubmit = async () => {
        await AddTweet(postContent);
        setPostContent('');
        handleClose()
    };
    const handleClose = () => {
        dispatch(CloseTweetForm())
    }
    if (!open) {
        return null;
    }
    //ADD EMOJI
    const handleEmojiSelect = (emoji : any) => {
        // Append the selected emoji at the end of the text
        setPostContent((prevContent) => prevContent + emoji.emoji);
      };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-10">
            <div className="bg-white dark:bg-slate-900 w-1/3 h-72  p-4 rounded-lg ">

                <textarea
                    onChange={(e) => setPostContent(e.target.value)}
                    value={postContent}
                    ref={textAreaRef}
                    placeholder="Write your Tweet here..."
                    className="w-full bg-transparent mt-2 p-2 text-black dark:text-white outline-none border-b-2 border-neutral-300 dark:border-neutral-700 focus:border-blue-500 h-[200px]"
                />
                <div className='flex justify-between'>
                <div className="flex justify-end mt-2">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
                    >
                        Tweet
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white px-4 py-2 rounded-lg"
                    >
                        Cancel
                    </button>
                </div>
                <div className='flex '>
                <button
                        onClick={() => setShowCustomEmojiPicker(!showCustomEmojiPicker)}
                        className="bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white px-4 py-2 rounded-lg transition"
                    >
                        😃 
                    </button>
                    
                </div>
            </div>
                {showCustomEmojiPicker && 
                    <EmojiPicker onEmojiClick={handleEmojiSelect} />
                    }
            </div>

        </div>
    );
}
export default TweetModal;
