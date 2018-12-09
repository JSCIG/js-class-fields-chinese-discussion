@a = 1
@b = @a

puts "#{@a} #{@b}"

class ClassInstanceVar
	@a = 2
	@b = @a

	puts "#{@a} #{@b}"
end
